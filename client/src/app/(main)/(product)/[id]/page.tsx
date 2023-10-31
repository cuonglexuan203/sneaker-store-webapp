import React from "react";

const Product = ({ params }: { params: { id: string } }) => {
    return <div>id: {params.id}</div>;
};

export default Product;
