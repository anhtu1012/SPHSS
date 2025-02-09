interface IconProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Logo = ({
  className,
  width = "3.6rem",
  height = "3.6rem",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 60 60"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.9675 11.6706C25.8298 7.54837 21.5128 5.50412 17.3668 5.19812C12.6766 4.85197 8.53894 6.75804 5.55518 9.76674C-0.310093 15.681 -2.09969 26.3732 5.2242 33.7307C5.24498 33.7516 5.2662 33.772 5.2878 33.792L28.5097 55.2723C29.331 56.0321 30.5986 56.0321 31.4199 55.2723L54.642 33.792L54.6917 33.7445C62.1235 26.4137 60.3261 15.7212 54.4367 9.80711C51.4422 6.80008 47.2911 4.89337 42.5917 5.23044C38.4363 5.52855 34.1092 7.56041 29.9675 11.6706ZM28.5067 20.162C28.0978 19.2136 27.1801 18.5846 26.148 18.5456C25.1159 18.5066 24.1533 19.0645 23.6741 19.9794L20.0065 26.9813H15.0647C13.5854 26.9813 12.3861 28.1805 12.3861 29.6598C12.3861 31.1391 13.5854 32.3384 15.0647 32.3384H21.6272C22.6236 32.3384 23.5377 31.7853 24 30.9027L25.8118 27.4439L30.2835 37.8183C30.6545 38.6789 31.4483 39.2831 32.3766 39.4114C33.305 39.5397 34.2329 39.1734 34.8234 38.4456L39.7783 32.3384H44.931C46.41 32.3384 47.6095 31.1391 47.6095 29.6598C47.6095 28.1805 46.41 26.9813 44.931 26.9813H38.5022C37.695 26.9813 36.9308 27.3453 36.4221 27.9722L33.4514 31.6338L28.5067 20.162Z"
      fill="#EC744A"
    />
  </svg>
);
