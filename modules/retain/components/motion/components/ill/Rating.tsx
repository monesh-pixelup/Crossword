import starFilledImage from "../../../../assets/motion/ill-icons/star-filled.svg";
import starEmptyImage from "../../../../assets/motion/ill-icons/star-empty.svg";

const starFilled = starFilledImage.src;
const starEmpty = starEmptyImage.src;

// ILL/Primitive/Rating (1954:323) + Rating-Star (1960:95). "Rating value
// is data and must not be modeled as a component variant."
export function Rating({ value, count }: { value: number; count: string }) {
  const filled = Math.round(value);
  return (
    <div className="ill-rating">
      <div className="ill-rating__stars">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src={i < filled ? starFilled : starEmpty} alt="" width={9} height={9} />
        ))}
      </div>
      <span className="ill-rating__count">({count})</span>
    </div>
  );
}
