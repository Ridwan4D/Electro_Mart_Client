import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import useOrder from "../../../Hooks/useOrder";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logo from "../../../assets/images/new.png"; // Adjust the path to your logo image
import axios from "axios";
import Loader from "../../Loader/Loader";

const Order = () => {
  const { payments, refetch } = useOrder();
  const axiosPublic = useAxiosPublic();
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Toggle the accordion for product details
  const toggleAccordion = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const allProductDetails = {};

        await Promise.all(
          payments.flatMap((payment) =>
            payment.products.map(async (product) => {
              const response = await axios.get(
                `https://electro-mart-server-sable.vercel.app/products/${product.mainProductId}`
              );
              allProductDetails[product.mainProductId] = response.data;
            })
          )
        );

        setProductDetails(allProductDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (payments) fetchProductDetails();
  }, [payments]);

  // Delete order
  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/orders/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire("Deleted!", "Your order has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete the order.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting order:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the order.",
              "error"
            );
          });
      }
    });
  };

  // Generate PDF
  const downloadPDF = (pay) => {
    const doc = new jsPDF();
    doc.addImage(logo, "PNG", 10, 10); // Adjust the position and size of the logo

    // Adding company details
    doc.setFontSize(12);
    doc.text("Company: Electro Mart", 90, 15);
    doc.text("Dhaka, Bangladesh, 1230", 90, 20);
    doc.text("Phone: 01786397249", 90, 25);
    doc.text("electromart@gmail.com", 90, 30);
    doc.text("www.electromart.com", 90, 35);

    doc.setFontSize(18);
    doc.text("Order Details", 10, 50);

    const columns = [
      { title: "Detail", dataKey: "detail" },
      { title: "Information", dataKey: "info" },
    ];

    const data = [
      {
        detail: "Product",
        info: pay.products
          .map(
            (product, index) =>
              `(${index + 1}): ${
                productDetails[product.mainProductId]?.title || "Loading..."
              }`
          )
          .join("\n"), // Use line breaks for multi-line display
      },
      {
        detail: "Product Category",
        info: pay.products
          .map(
            (product, index) =>
              `${index + 1}. ${
                productDetails[product.mainProductId]?.category || "Loading..."
              }`
          )
          .join(", "),
      },
      { detail: "Order ID", info: `#${pay.tran_id}` },
      { detail: "Name", info: pay.name },
      { detail: "Phone", info: pay.number },
      { detail: "Division", info: pay.division },
      { detail: "District", info: pay.district },
      { detail: "City", info: pay.city },
      { detail: "Address", info: pay.address },
      { detail: "Payment Method", info: pay.paymentMethod },
      { detail: "Shipping Method", info: pay.shipping },
      { detail: "Status", info: pay.orderStatus },
      { detail: "Total Price", info: `${pay.totalAmount} Taka ` },
    ];

    doc.autoTable(columns, data, {
      startY: 55,
      margin: { horizontal: 10 },
      styles: {
        fillColor: [240, 240, 240],
        fontSize: 12,
        cellPadding: 5,
        lineWidth: 0.1,
        lineColor: [200, 200, 200],
      },
      headStyles: {
        fillColor: [54, 162, 235],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
    });

    doc.save("customer_details.pdf");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="pt-10">
      <h1 className="font-semibold text-2xl mt-4 mb-4 ml-5">Order List</h1>
      <div className="overflow-x-auto bg-white shadow-md">
        <table className="table">
          <thead>
            <tr className="bg-blue-50 text-md">
              <th></th>
              <th>Product Name</th>
              <th>Order ID</th>
              <th>
                Price
                <span className="font-semibold text-black ml-1">( ৳ )</span>
              </th>
              <th>Payment Method</th>
              <th>Shipping Charge</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((pay, indx) => (
              <React.Fragment key={pay._id}>
                <tr>
                  <th className="font-normal border">{indx + 1}</th>
                  <td
                    className="border-r cursor-pointer"
                    onClick={() => toggleAccordion(pay._id)}
                  >
                    <div className="font-normal">
                      <div>
                        {pay.products.map((product, index) => (
                          <div key={index}>
                            {`(${index + 1}):  ${
                              productDetails[product.mainProductId]?.title ||
                              "Loading..."
                            }`}
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="text-blue-500 border-r font-semibold">
                    #{pay?.tran_id}
                  </td>
                  <td className="border-r font-semibold">{pay?.totalAmount}</td>
                  <td className="border-r">
                    <p className="font-normal text-[13px]">
                      {pay?.paymentMethod}
                    </p>
                  </td>
                  <td className="border-r">{pay?.shipping}</td>
                  <td
                    className={`border-r ${
                      pay?.orderStatus === "pending"
                        ? "text-red-500"
                        : "text-green-400 font-semibold capitalize"
                    }`}
                  >
                    {pay?.orderStatus}
                  </td>
                  <td className="border-r">
                    <FaRegTrashAlt
                      onClick={() => handleDeleteOrder(pay._id)}
                      className="text-red-500 cursor-pointer text-xl font-bold"
                    />
                  </td>
                </tr>
                {/* Accordion for product details */}
                {expandedProductId === pay._id && (
                  <tr>
                    <td colSpan="8" className="p-4 bg-gray-100">
                      <div>
                        <h3 className="font-semibold">Customer Details</h3>
                        <div className="grid grid-cols-2">
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Product:
                            </h2>
                            <h2 className="pr-2 py-2 text-[13px]">
                              <div>
                                <div>
                                  {pay.products.map((product, index) => (
                                    <div key={index}>
                                      {`(${index + 1}): ${
                                        productDetails[product.mainProductId]
                                          ?.title || "Loading..."
                                      }`}
                                      <br />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Product Category:
                            </h2>
                            <h2 className="py-2 flex gap-2">
                              {pay.products.map((product, index) => (
                                <span key={index} className="flex">
                                  {productDetails[product.mainProductId]
                                    ?.category || "Loading..."}
                                  {index < pay.products.length - 1 && ","}
                                </span>
                              ))}
                            </h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Order ID:
                            </h2>
                            <h2 className="py-2 font-semibold">
                              #{pay?.tran_id}
                            </h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Name:
                            </h2>
                            <h2 className="py-2">{pay?.name}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Phone:
                            </h2>
                            <h2 className="py-2">{pay?.number}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Division:
                            </h2>
                            <h2 className="py-2">{pay?.division}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              District:
                            </h2>
                            <h2 className="py-2">{pay?.district}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              City:
                            </h2>
                            <h2 className="py-2">{pay?.city}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Address:
                            </h2>
                            <h2 className="py-2">{pay?.division}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Payment Method:
                            </h2>
                            <h2 className="py-2">{pay?.shipping}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Shipping Method:
                            </h2>
                            <h2 className="py-2">{pay?.shipping}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Status:
                            </h2>
                            <h2 className="py-2">{pay?.orderStatus}</h2>
                          </div>
                          <div className="border flex items-center">
                            <h2 className="font-semibold px-4 py-2 text-sm">
                              Total Price:
                            </h2>
                            <h2 className="py-2">{pay?.totalAmount} Taka</h2>
                          </div>
                          {/* Download PDF Button */}
                          <div className="py-2 px-2 border">
                            <button
                              onClick={() => downloadPDF(pay)}
                              className="bg-gradient-to-r from-[#A539D5] via-black to-violet-600 rounded-md py-2 px-4 text-white font-semibold"
                            >
                              Download PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
