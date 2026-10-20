
import { site } from "@/data/site";
import Image from "next/image";

export function BrandMark() {
  return(
    <Image src ="/images/Golden Noor Estate & Builders Logo.png" alt={`${site.name} Logo`} width={200} height={100} />
  ) 
    
}
