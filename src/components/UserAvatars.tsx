import { User } from "@/services/interface";

type Props = {
  users: User[];
};

export default function UserAvatars(props: Props) {
  const { users } = props;

  return (
    <div className="flex items-center -space-x-1.5">
      {users.slice(0, 4).map(({ id, avatar }) => (
        <div
          key={id}
          className="h-[25px] w-[25px] shrink-0 bg-white-light rounded-full border border-white hover:border-primary hover:-translate-y-1 duration-300"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={avatar} alt="avatar" className="object-contain" />
        </div>
      ))}

      {users.length > 4 && (
        <div className="flex justify-center items-center h-[25px] w-[25px] shrink-0 bg-blue-100 rounded-full border border-white text-[11px] font-medium text-blue-500">
          +{users.length - 4}
        </div>
      )}
    </div>
  );
}
