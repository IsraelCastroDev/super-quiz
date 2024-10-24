import { getUserProfile, getQuizFromUser } from "@/api";
import { UserProfileQuizzes, UserProfileData } from "@/components/auth";
import { Container } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";

export function ProfilePage() {
  const { data: userProfileData, isLoading: userProfileLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  const { data: userQuizzes, isLoading: userQuizzesLoading } = useQuery({
    queryKey: ["user-quizzes"],
    queryFn: getQuizFromUser,
  });

  return (
    <Container styles="space-y-10">
      <UserProfileData
        userProfileData={userProfileData}
        isLoading={userProfileLoading}
      />
      <UserProfileQuizzes
        userQuizzes={userQuizzes}
        isLoading={userQuizzesLoading}
      />
    </Container>
  );
}
