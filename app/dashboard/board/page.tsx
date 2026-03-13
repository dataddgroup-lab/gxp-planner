import BoardClient from './BoardClient'

// Auth and data fetching handled client-side — no cookie dependency
export default function BoardPage() {
  return <BoardClient initialItems={[]} tenantId={null} userId="" />
}
