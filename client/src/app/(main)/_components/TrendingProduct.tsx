import Image from "next/image";
import { type Sneaker } from "../_store/services/productsApi";
import Link from "next/link";

const TrendingProduct = ({ product: p, color }: { product: Sneaker, color: string }) => {
    const bgColor = "bg-" + color + "-200";
    const borderColor = "border-" + color + "-400";
    const itemWidth = "433px";
    const itemHeight = "532px";
    return (
        <div className="snap-center shrink-0">
            <Link href={`/products/${p.id}`}>
                <div className={`w-[${itemWidth}] h-[${itemHeight}] flex items-center justify-center border-[18px] ${borderColor} ${bgColor} rounded-sm`}>
                    <Image
                        className="shrink-0 w-[324px] h-[324px]"
                        width={0}
                        height={0}
                        sizes="100%"
                        src={p.imageUrl}
                        alt="product image"
                    />
                </div>
            </Link>
            <h2 className={`text-center mt-8 font-semibold text-xl w-[${itemWidth}] line-clamp-1`}>{p.name}</h2>
        </div>
    );
};

export default TrendingProduct;
