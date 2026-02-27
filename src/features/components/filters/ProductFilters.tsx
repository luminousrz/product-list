import { Swiper, SwiperSlide } from "swiper/react";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropdown";
import CategoryDropdown from "./CategoryDropdown";
import BrandDropdown from "./BrandDropdown";
import StockSwitch from "./StockSwitch";


const filterComponents = [
  <SortDropdown key="sort" />,
  <CategoryDropdown key="cat" />,
  <BrandDropdown key="brand" />,
  <PriceFilter key="price" />,
  <StockSwitch key="stock" />
];

export default function ProductFilters() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      {/* Mobile */}
      <div className="md:hidden w-full">
        <Swiper spaceBetween={8} slidesPerView="auto" slidesOffsetBefore={24} slidesOffsetAfter={24}>
          {filterComponents.map((comp, i) => (
            <SwiperSlide key={i} className="w-auto!">
              <div onPointerDown={(e) => e.stopPropagation()}>{comp}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex gap-4">
        {filterComponents}
      </div>
    </div>
  );
}