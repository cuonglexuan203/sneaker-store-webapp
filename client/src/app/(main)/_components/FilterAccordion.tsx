import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import FilterCompartment from "./FilterCompartment";

export interface Compartment {
    name: string;
    value: string;
}

export interface Accordion {
    name: string;
    param: string;
    compartments: Compartment[];
}

const FilterAccordion = ({ accordion }: { accordion: Accordion }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);
    //
    return (
        <div className="">
            <button
                type="button"
                className="flex items-center w-full py-2 pr-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 z-10"
                onClick={() => setIsAccordionOpen((s) => !s)}
            >
                <span className="flex-1 text-left rtl:text-right whitespace-nowrap">
                    {accordion.name}
                </span>
                <svg
                    className={`w-3 h-3 inline transition-all duration-500 ease-out ${isAccordionOpen ? " rotateX-all" : ""
                        }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <ul
                className={`h-0 overflow-hidden transition-all duration-100 ease-out space-y-2 ${isAccordionOpen ? "p-2 h-auto" : ""
                    }`}
            >
                {accordion.compartments.map((i, idx) => (
                    <li key={idx}>
                        <FilterCompartment
                            accordionParam={accordion.param}
                            compartment={i}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterAccordion;
