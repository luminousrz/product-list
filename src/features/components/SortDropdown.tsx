import { SortOption } from "../products/types";
import { useProductStore } from "../store/product.store";

const options: {label: string , value: SortOption} [] = [
    {label: "Newest" , value: "newest"},
    {label: "Price: Highest to Lowest" , value: "price-desc"},
    {label: "Price: Lowest to Highest" , value: "price-asc"},
    {label: "Highest Discount" , value: "discount-desc"},
]

export default function SortDropdown(){
    const sort = useProductStore((s) => s.sort)
    const setSort = useProductStore((s) => s.setSort)

    return(
        <select 
            value={sort}   
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border rounded-xl px-6 py-2"
        >
            {options.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
        </select>
    )
}