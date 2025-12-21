
interface UserObject {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarFileName: string;
    avatarUrl: string;
}

export default function UserDetails({ user }: { user: UserObject }) {

    console.log(user)

    return <div>

    </div>
}

