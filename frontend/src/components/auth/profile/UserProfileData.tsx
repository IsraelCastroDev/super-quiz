import { Text } from "@/components/ui";
import { ButtonSubmit, Form, InputField } from "@/components/ui/Form";
import type { UserProfileData } from "@/types";
import { formatDate } from "@/utils";
import { UserProfileDataSkeleton } from "./Skeletons/UserProfileDataSkeleton";

interface Props {
  userProfileData: UserProfileData | undefined;
  isLoading: boolean;
}

export function UserProfileData({ userProfileData, isLoading }: Props) {
  return (
    <div>
      {isLoading ? (
        <UserProfileDataSkeleton />
      ) : userProfileData ? (
        <>
          <div className="flex gap-x-2 items-center">
            <Text as="p" category="title">
              Mi perfil
            </Text>
            <span className="font-black">-</span>
            <Text as="h1" category="title">
              {userProfileData?.name} {userProfileData?.lastname}
            </Text>
          </div>

          <div className="border border-slate-700 p-3 mt-5 relative space-y-4 rounded-md">
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
        </>
      ) : (
        <Text as="h2" category="subtitle" className="text-center">
          No hay datos
        </Text>
      )}
    </div>
  );
}
