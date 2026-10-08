import Image, { type StaticImageData } from "next/image";
import bracelet from "../../../assets/hero/products/bracelet.png";
import thumb1 from "../../../assets/hero/products/thumb-1.png";
import thumb2 from "../../../assets/hero/products/thumb-2.png";
import thumb3 from "../../../assets/hero/products/thumb-3.png";
import thumb4 from "../../../assets/hero/products/thumb-4.png";
import thumb5 from "../../../assets/hero/products/thumb-5.png";

type Thumb = {
  src: StaticImageData;
  /** Frame that crops the image, positioned inside the 58.333px tile. */
  frame: string;
  /** Image placement within the frame. */
  image: string;
  width: number;
  height: number;
};

const centered = "-translate-x-1/2 -translate-y-1/2 absolute";

const thumbs: Thumb[] = [
  {
    src: thumb1,
    frame: `${centered} left-[calc(50%-0.34px)] top-[calc(50%-19.93px)] size-[36.908px]`,
    image: "size-full object-contain",
    width: 37,
    height: 37,
  },
  {
    src: thumb2,
    frame: "absolute left-[-2.16px] top-[-21.11px] h-[60.362px] w-[60.451px] overflow-hidden",
    image: "absolute left-0 top-[-0.07%] h-[100.15%] w-full max-w-none",
    width: 61,
    height: 61,
  },
  {
    src: thumb3,
    frame: `${centered} left-[calc(50%-0.25px)] top-[calc(50%-19.83px)] h-[51.398px] w-[49.88px] rounded-[2.159px] overflow-hidden`,
    image: "size-full object-cover",
    width: 50,
    height: 51,
  },
  {
    src: thumb4,
    frame: `${centered} left-[calc(50%-0.26px)] top-[calc(50%-19.83px)] h-[50.671px] w-[35.088px] overflow-hidden`,
    image: "absolute left-0 top-[6.2%] h-[117.9%] w-full max-w-none",
    width: 35,
    height: 60,
  },
  {
    src: thumb5,
    frame: `${centered} left-[calc(50%-0.24px)] top-[calc(50%-16.19px)] h-[57.852px] w-[35.088px] overflow-hidden`,
    image: "absolute left-0 top-[4.57%] h-[103.26%] w-full max-w-none",
    width: 35,
    height: 60,
  },
];

/** Storefront product gallery (PDP) peeking out from the left of the chat. */
export function ProductGalleryCard() {
  return (
    <div className="absolute top-[394px] left-[296px] flex h-[323px] w-[362px] flex-col items-start overflow-clip rounded-[6.079px] bg-parchment p-[11.541px]">
      <div className="flex w-[665.739px] items-start py-[21.605px]">
        <div className="flex h-[265.157px] w-[339.195px] flex-col items-start gap-[10.802px]">
          <div className="flex min-h-px w-full flex-[1_0_0] flex-col items-center justify-center overflow-clip rounded-[8.105px] hairline-[0.289px] outline-rose-line bg-[#fff9e9] px-[1.731px] pt-[1.731px] pb-[6.924px]">
            <div className="relative h-[154.718px] w-[235.966px] shrink-0 overflow-hidden">
              <Image
                src={bracelet}
                alt=""
                width={236}
                height={195}
                className="absolute top-0 left-0 h-[125.95%] w-full max-w-none"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            {thumbs.map((thumb, i) => (
              <div
                key={i}
                className="relative size-[58.333px] shrink-0 overflow-clip rounded-[8.642px] hairline-[0.54px] outline-[rgba(33,33,33,0.5)] bg-[#fef9ec]"
              >
                <div className={thumb.frame}>
                  <Image
                    src={thumb.src}
                    alt=""
                    width={thumb.width}
                    height={thumb.height}
                    className={thumb.image}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
