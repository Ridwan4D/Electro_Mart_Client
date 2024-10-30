import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import UserAuth from "./useAuth";


const useCart = () => {
    const { user } = UserAuth();
    const axiosPublic = useAxiosPublic();
    const { data: carts = [], refetch,isLoading } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const result = await axiosPublic.get("/carts");
            return result.data;
        },
    });
    const theUserCarts = carts?.filter(cart => cart?.adderMail == user?.email)
    return { carts, theUserCarts, refetch,isLoading };
};

export default useCart;
