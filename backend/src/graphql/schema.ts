export const schema = `
  type Track {
    id: ID!
    title: String!
    artist: String!
    album: String
    genres: [String!]!
    slug: String!
    coverImage: String
    audioFile: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    tracks: [Track!]!
    track(id: ID!): Track
  }

  type Subscription {
    activeTrackTitle: String!
  }
`;
