import { Skeleton, Text } from "@/components/ui";
import { ButtonSubmit, Form, InputField } from "@/components/ui/Form";
import type { UserProfileData } from "@/types";
import { formatDate } from "@/utils";

interface Props {
  userProfileData: UserProfileData | undefined;
  isLoading: boolean;
}

export function UserProfileData({ userProfileData, isLoading }: Props) {
  return (
    <div>
      {isLoading ? (
        <div className="border border-slate-700 p-4 mt-5 relative space-y-4 rounded-md">
          <div className="flex gap-x-2 items-center">
            <Skeleton className="w-52 h-6 rounded-sm bg-gray-600" />
            <span className="font-black">-</span>
            <Skeleton className="w-60 h-6 rounded-sm bg-gray-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-3 gap-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-md">
                <div className="space-y-2">
                  <Skeleton className="w-14 h-4 rounded-md bg-gray-600" />
                  <Skeleton className="w-full h-10 rounded-md bg-gray-600" />
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <Skeleton className="w-80 h-12 bg-gray-600" />
            </div>
          </div>
        </div>
      ) : userProfileData ? (
        <div className="border border-slate-700 p-3 mt-5 relative space-y-4 rounded-md">
          <div className="flex gap-x-2 items-center">
            <Text as="p" category="title">
              Mi perfil
            </Text>
            <span className="font-black">-</span>
            <Text as="h1" category="title">
              {userProfileData?.name} {userProfileData?.lastname}
            </Text>
          </div>

          <Form>
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-3 gap-y-4">
              <InputField
                id="name"
                label="Nombre"
                value={userProfileData.name}
                disabled
              />
              <InputField
                id="lastname"
                label="Apellido"
                value={userProfileData.lastname}
                disabled
              />

              <InputField
                id="username"
                label="Nombre de usuario"
                value={userProfileData.username}
                disabled
              />

              <InputField
                id="email"
                label="Email"
                value={userProfileData.email}
                disabled
              />

              <InputField
                id="created_at"
                label="Fecha de registro"
                value={formatDate(userProfileData.created_at)}
                disabled
              />
            </div>

            <div className="max-w-80 mx-auto">
              <ButtonSubmit>Enviar</ButtonSubmit>
            </div>
          </Form>
        </div>
      ) : (
        <Text as="h2" category="subtitle" className="text-center">
          No hay datos
        </Text>
      )}
    </div>
  );
}
