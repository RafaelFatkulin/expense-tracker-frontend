type Props = {
  title: string;
  description: string;
};

export const AuthHeader = ({ title, description }: Props) => (
  <div className='flex flex-col space-y-2 text-center'>
    <h1 className='text-xl md:text-2xl font-semibold'>{title}</h1>
    <p className='text-sm text-muted-foreground'>{description}</p>
  </div>
);
