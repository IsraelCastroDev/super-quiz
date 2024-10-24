import { getUserProfile } from "@/api/authAPI";
import { Container, Loader, Text } from "@/components/ui";
import { ButtonSubmit, InputField } from "@/components/ui/Form";
import { formatDate } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function ProfilePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  return (
    <Container>
      <div className="flex gap-x-2 items-center">
        <Text as="p" category="title">
          Mi perfil
        </Text>
        <span className="font-black">-</span>
        <Text as="h1" category="title">
          {data?.name} {data?.lastname}
        </Text>
      </div>

      <div className="border border-slate-700 p-3 mt-5 relative space-y-4">
        {isLoading ? (
          <Loader />
        ) : (
          data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-x-3 gap-y-4">
                <InputField
                  id="name"
                  label="Nombre"
                  value={data.name}
                  disabled
                />
                <InputField
                  id="lastname"
                  label="Apellido"
                  value={data.lastname}
                  disabled
                />

                <InputField
                  id="username"
                  label="Nombre de usuario"
                  value={data.username}
                  disabled
                />

                <InputField
                  id="email"
                  label="Email"
                  value={data.email}
                  disabled
                />

                <InputField
                  id="created_at"
                  label="Fecha de registro"
                  value={formatDate(data.created_at)}
                  disabled
                />
              </div>

              <div className="max-w-80 mx-auto">
                <ButtonSubmit>Enviar</ButtonSubmit>
              </div>
            </>
          )
        )}
      </div>
    </Container>
  );
}
