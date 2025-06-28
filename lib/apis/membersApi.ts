import {
  getMembers as getMembersServerAction,
  addMember as addMemberServerAction,
  updateMember as updateMemberServerAction,
  deleteMember as deleteMemberServerAction,
} from "@/app/admin/dashboard/members/serverActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Member {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    userImage: string;
}

export type MemberInput = Omit<Member, '_id'>;

// Pure async functions for SSR or direct server action call
export async function fetchMembers(): Promise<Member[]> {
    const data = await getMembersServerAction();
    return data as Member[];
}

export async function addMember(member: MemberInput): Promise<Member> {
    return addMemberServerAction(member);
}

export async function updateMember(id: string, member: Partial<MemberInput>): Promise<Member> {
    return updateMemberServerAction(id, member);
}

export async function deleteMember(id: string): Promise<string> {
    await deleteMemberServerAction(id);
    return id;
}

// React Query hooks
export function useMembers() {
    return useQuery<Member[]>({
        queryKey: ['members'],
        queryFn: fetchMembers,
    });
}

export function useAddMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addMember,
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
        mutationFn: deleteMember,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['members'] }),
    });
} 