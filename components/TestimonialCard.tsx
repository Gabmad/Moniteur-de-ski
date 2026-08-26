type TestimonialCardProps = {
  quote: string;
  author: string;
};

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <figure className="min-w-full shrink-0 snap-center px-2 md:px-8">
      <blockquote className="mx-auto max-w-3xl text-center font-display text-xl font-medium leading-snug sm:text-2xl md:text-3xl">
        « {quote} »
      </blockquote>
      <figcaption className="mt-8 text-center text-sm text-mist">{author}</figcaption>
    </figure>
  );
}
