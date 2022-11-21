export type DiscordResponse = {
  app_permissions?: string;
  application_id: string;
  channel_id?: string;
  data?:
    | Record<string, never>
    | {
        id: string;
        name: string;
        guild_id: string;
        type: number;
      };
  entitlement_sku_ids?: [];
  guild_id?: string;
  guild_locale?: string;
  id: string;
  locale?: string;
  token: string;
  type: number;
  user: {
    avatar: string;
    avatar_decoration: null;
    discriminator: string;
    id: string;
    public_flags: number;
    username: string;
  };
  member?: {
    avatar: null;
    communication_disabled_until?: null;
    deaf: boolean;
    flags: number;
    is_pending: boolean;
    joined_at: string;
    mute: boolean;
    nick: boolean;
    pending: boolean;
    permissions: string;
    premium_since: null;
    roles: string[];
    user: {
      avatar: string;
      avatar_decoration: null;
      discriminator: string;
      id: string;
      public_flags: number;
      username: string;
    };
  };
  version: number;
};

export type DiscordResponseCommand = {
  id: string;
  application_id: string;
  version: string;
  default_permission: boolean;
  default_member_permissions: null;
  type: number;
  name: string;
  description: string;
  guild_id: string;
};

export type CommandType = {
  name: string;
  description: string;
};
