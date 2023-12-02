import Image from "next/image";
import { type Sneaker } from "../_store/services/productsApi";
import Link from "next/link";

const TrendingProduct = ({ product: p, bgColor, borderColor }: { product: Sneaker, bgColor: string, borderColor: string }) => {
    const itemWidth = "433px";
    const itemHeight = "532px";
    const imageSize = "324px";
    return (
        <div className={`snap-center shrink-0`}>
            <Link href={`/products/${p.id}`} className={`w-[${itemWidth}]`}>
                <div className={`w-[${itemWidth}] h-[${itemHeight}] flex items-center justify-center border-[18px] ${borderColor} ${bgColor} rounded-md`}>
                    <Image
                        className={`shrink-0 w-[${imageSize}] h-[${imageSize}]`}
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
