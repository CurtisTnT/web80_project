type Props = {
  title: string;
};

export default function PageTitle(props: Props) {
  const { title } = props;

  return <h1 className="text-xl font-medium">{title}</h1>;
}
