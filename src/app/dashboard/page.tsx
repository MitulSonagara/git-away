import { auth } from "@/lib/auth";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return <p>Redirecting...</p>;
  }

  const { id, name, email, role, image } = session.user;

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="shadow-md rounded-lg p-4 space-y-3">
        {image && (
          <Image
            src={image}
            alt={name ?? "User"}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <p>
          <strong>ID:</strong> {id}
        </p>
        <p>
          <strong>Name:</strong> {name ?? "No name"}
        </p>
        <p>
          <strong>Email:</strong> {email ?? "No email"}
        </p>
        <p>
          <strong>Role:</strong> {role}
        </p>
      </div>
    </div>
  );
}
