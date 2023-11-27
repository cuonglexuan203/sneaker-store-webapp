import Link from "next/link";
import { type Compartment } from "./FilterAccordion";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const FilterCompartment = ({
    accordionParam,
    compartment,
}: {
    accordionParam: string;
    compartment: Compartment;
}) => {
    const [isChecked, setIsChecked] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (isChecked) {
            setIsChecked(!isChecked);
        }
    }, [searchParams.get("q")]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    //
    const toggleCheckbox = () => setIsChecked(!isChecked);

    const handlePathname = () => {
        const oldParamArr = searchParams.get(accordionParam)?.split(",");
        let newParam = "";
        if (isChecked) {
            newParam =
                oldParamArr?.filter((i) => i !== compartment.value).join(",") ||
                "";
        } else {
            const newParamArr = oldParamArr?.slice() || [];
            newParamArr.push(compartment.value);
            newParam = newParamArr?.join(",") || "";
        }
        const newPathname =
            pathname + "?" + createQueryString(accordionParam, newParam);
        return newPathname;
    };
    const pathnameToggle = handlePathname();
    return (
        <Link href={pathnameToggle} onClick={toggleCheckbox}>
            <button>
                <div className="flex items-center">
                    <input
                        id={accordionParam + "-" + compartment.value}
                        type="checkbox"
                        className="w-5 h-5 text-white checked:bg-sky-300 hover:bg-gray-100 checked:hover:bg-sky-400 cursor-pointer rounded"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <label
                        htmlFor={accordionParam + "-" + compartment.value}
                        className=" ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                        {compartment.name}
                    </label>
                </div>
            </button>
        </Link>
    );
};

export default FilterCompartment;
