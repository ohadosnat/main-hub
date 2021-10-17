interface Props {
  title: string;
  startIcon?: JSX.Element;
}

type PropsType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  Props;

const Button = ({ title, startIcon, className, onClick }: PropsType) => {
  return (
    <button
      onClick={onClick}
      aria-current={className?.includes("current") && true}
      aria-label={`${title} theme toggle button`}
      className={`${className} flex border-2 py-1 px-2 rounded-lg border-current justify-center items-center space-x-2 transform hover:scale-110 global-transition`}
    >
      {startIcon && startIcon}
      <p className="capitalize">{title}</p>
    </button>
  );
};

export default Button;
