import Image from "next/image";
import { type Sneaker } from "../_store/services/productsApi";
import Link from "next/link";

const TrendingProduct = ({ product: p, bgColor, borderColor }: { product: Sneaker, bgColor: string, borderColor: string }) => {

    return (
        <div className={`snap-center shrink-0`}>
            <Link href={`/products/${p.id}`}>
                <div className={`w-[370px] h-[470px] xl:w-[433px] xl:h-[532px] flex items-center justify-center border-[18px] ${borderColor} ${bgColor} rounded-md`}>
                    <Image
                        className={`shrink-0 w-[370px] h-[470px] xl:w-[433px] xl:h-[532px]`}
                        width={0}
                        height={0}
                        sizes="100%"
                        src={p.imageUrl}
                        alt="product image"
                    />
                </div>
            </Link>
            <h2 className={`text-center mt-8 font-semibold text-xl w-[370px] line-clamp-1`}>{p.name}</h2>
        </div>
    );
};

export default TrendingProduct;
