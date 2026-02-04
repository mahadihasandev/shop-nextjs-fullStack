import React from "react";
import { getHotDeals } from "@/sanity/lib";
import { Title } from "@/components/ui/text";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

const DealPage = async () => {
  const hotDeals = await getHotDeals();

  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title
          className="mb-5 underline underline-offset-4 
        decoration-1 text-base uppercase tracking-wide font-sans shadow-md shadow-shop_light_blue/20 rounded-md px-3 py-3"
        >
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {hotDeals.map((product) => (
            <ProductCard key={product._id} product={product as any} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
