import Image from "next/image";
import { type Sneaker } from "../_store/services/productsApi";

const Product = ({ product: p }: { product: Sneaker }) => {
    return (
        <div className="mx-auto group relative w-full h-fit max-w-xs overflow-hidden rounded-lg bg-white shadow-md select-none">
            {/* Image */}
            <a href="#">
                <div className="overflow-hidden h-48 md:h-52 lg:h-60">
                    <Image
                        className="w-full h-full rounded-t-lg object-fill transition-all duration-300 group-hover:scale-90"
                        width={0}
                        height={0}
                        sizes="100%"
                        src={p.imageUrl}
                        alt="product image"
                    />
                </div>
            </a>
            <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                Sale
            </span>
            {/* Infor */}
            <div className="mt-4 px-5 pb-5">
                <p className="mt-1 text-sm text-gray-400">{p.brand}</p>
                <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                    {p.name}
                </h5>
                <p className="mt-2.5 mb-5 flex items-center text-gray-700">
                    {p.categories.join(", ")}
                </p>
                <div className="flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">
                            {p.price}
                        </span>
                        <span className="ml-2 text-sm text-slate-900 line-through">
                            $299
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Product;
