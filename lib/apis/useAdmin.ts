import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMembers, updateMember, deleteMember, Member, MemberInput } from './membersApi';
import { addMember as addMemberServerAction } from '@/app/admin/dashboard/members/serverActions';
import { loginUser, signupUser } from '@/app/admin/login/serverActions';
import { signOut } from '@/app/admin/serverActions';
import { fetchEventsAsync, Event, EventInput } from './eventsApi';
import { getEvents, addEvent, updateEvent, deleteEvent } from '@/app/admin/dashboard/events/serverActions';
import { getMembers } from '@/app/admin/dashboard/members/serverActions';

// Members
export function useMembers() {
  return useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getMembers();
      return data as Member[];
    },
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (member: MemberInput) => addMemberServerAction(member),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, member }: { id: string; member: Partial<MemberInput> }) => updateMember(id, member),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMember(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
  });
}

// Events
export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: fetchEventsAsync,
  });
}

export function useAddEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: EventInput) => addEvent(event as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, event }: { id: string; event: Partial<EventInput> }) => updateEvent(id, event),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });
}

// Admin Auth
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
}
