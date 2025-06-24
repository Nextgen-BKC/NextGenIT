export interface Member {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    userImage: string;
}

export type MemberInput = Omit<Member, '_id'>;

export async function fetchMembers(): Promise<Member[]> {
    const response = await fetch('/api/members');
    if (!response.ok) throw new Error('Failed to fetch members');
    const data = await response.json();
    return data.data;
}

export async function addMember(member: MemberInput): Promise<Member> {
    const response = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
    });
    if (!response.ok) throw new Error('Failed to add member');
    const data = await response.json();
    return data.data;
}

export async function updateMember(id: string, member: Partial<MemberInput>): Promise<Member> {
    const response = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
    });
    if (!response.ok) throw new Error('Failed to update member');
    const data = await response.json();
    return data.data;
}

export async function deleteMember(id: string): Promise<string> {
    const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete member');
    return id;
} 