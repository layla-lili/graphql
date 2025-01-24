import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from 'next/image';

const reviews = [
  {
    name: "Noob1",
    username: "@Noob1",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Noob2",
    username: "@Noob2",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Noob3",
    username: "@Noob3",
    body: "MENA IS THE BEST!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob4",
    username: "@Noob4",
    body: "MENA IS THE BEST!!!",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Noob5",
    username: "@Noob5",
    body: "MENA IS THE BEST!!!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Noob6",
    username: "@Noob6",
    body: "CHESS QUEEN NOORA!!!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Noob7",
    username: "@Noob7",
    body: "CHESS QUEEN NOORA!!!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Noob8",
    username: "@Noob8",
    body: "CHESS QUEEN NOORA!!!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Noob9",
    username: "@Noob9",
    body: "fatali: SLAAAYYYY!!!",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Noob10",
    username: "@Noob10",
    body: "fatali: SLAAAYYYY!!!",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Noob11",
    username: "@Noob11",
    body: "fatali: SLAAAYYYY!!!",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Noob12",
    username: "@Noob12",
    body: "Eman: GRAPEEEE!!!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Noob13",
    username: "@Noob13",
    body: "Eman: GRAPEEEE!!!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Noob14",
    username: "@Noob14",
    body: "Eman: GRAPEEEE!!!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Noob15",
    username: "@Noob15",
    body: "Hawra: Lets Order Boba!!!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Noob16",
    username: "@Noob16",
    body: "Hawra: Lets Order Boba!!!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Noob17",
    username: "@Noob17",
    body: "Hawra: Lets Order Boba!!!",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Noob18",
    username: "@Noob18",
    body: "zhashim: hello Keteki!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob19",
    username: "@Noob19",
    body: "zhashim: hello Keteki!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob20",
    username: "@Noob20",
    body: "zhashim: hello Keteki!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob21",
    username: "@Noob21",
    body: "mariam-malhawi: (صح؟)",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob22",
    username: "@Noob22",
    body: "mariam-malhawi: (صح؟)",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob23",
    username: "@Noob23",
    body: "mariam-malhawi: (صح؟)",
    img: "https://avatar.vercel.sh/john",
  },

  {
    name: "Noob24",
    username: "@Noob24",
    body: "reemohamed: Dammm!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob25",
    username: "@Noob25",
    body: "reemohamed: Dammm!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob26",
    username: "@Noob26",
    body: "reemohamed: Dammm!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob27",
    username: "@Noob27",
    body: "Akhalid: Capeesh!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob28",
    username: "@Noob28",
    body: "Akhalid: Capeesh!!!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Noob29",
    username: "@Noob29",
    body: "Akhalid: Capeesh!!!",
    img: "https://avatar.vercel.sh/john",
  },
 
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // Updated light mode styles
        "border-gray-950/[.3] bg-gray-950/[.1] hover:bg-gray-950/[.15]",
        // Updated dark mode styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width={32} height={32} alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};


export function MarqueeDemo() {
  return (
    // <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
    <>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 "></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 "></div>
      </>
    // </div>
  );
}
