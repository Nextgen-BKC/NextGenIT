import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMembers, addMember, updateMember, deleteMember, Member, MemberInput } from './membersApi';
import { fetchEvents, addEvent, updateEvent, deleteEvent, Event, EventInput } from './eventsApi';

// Members
export function useMembers() {
  return useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: fetchMembers,
  });
}

export function useAddMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (member: MemberInput) => addMember(member),
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
    queryFn: fetchEvents,
  });
}

export function useAddEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event: EventInput) => addEvent(event),
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
