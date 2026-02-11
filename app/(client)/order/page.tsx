import Container from "@/components/Container";
import { getOrder } from "@/sanity/lib";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";


const OrderPage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const orders = (await getOrder(user.id)) || [];

  return (
    <Container className="py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>

      {!orders || orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
          <p className="text-gray-600">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Items
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order:any) => (
                  <tr
                    key={order._id}
                    className="bg-white border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {order.orderNumber?.slice(-6) || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {order.orderDate &&
                        new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {order.status && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold
                                              ${
                                                order.status === "paid"
                                                  ? "bg-green-100 text-green-800"
                                                  : order.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                              }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.currency} {order.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      {order.products ? order.products.length : 0} items
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default OrderPage;
