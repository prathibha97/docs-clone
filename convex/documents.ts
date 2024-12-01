import { paginationOptsValidator } from 'convex/server';
import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getByIds = query({
  args: { ids: v.array(v.id('documents')) },
  async handler(ctx, { ids }) {
    const documents = [];
    for (const id of ids) {
      const document = await ctx.db.get(id);
      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: '[Removed]' });
      }
    }
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('You must be logged in to create a document');
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert('documents', {
      title: args.title || 'Untitled Document',
      initialContent: args.initialContent,
      ownerId: user.subject,
      organizationId,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('You must be logged in to get documents');
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (search && organizationId) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('organizationId', organizationId)
        )
        .paginate(paginationOpts);
    }

    if (search) {
      return await ctx.db
        .query('documents')
        .withSearchIndex('search_title', (q) =>
          q.search('title', search).eq('organizationId', organizationId)
        )
        .paginate(paginationOpts);
    }
    if (organizationId) {
      return await ctx.db
        .query('documents')
        .withIndex('by_organization_id', (q) =>
          q.eq('organizationId', organizationId)
        )
        .paginate(paginationOpts);
    }
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
      .paginate(paginationOpts);
  },
});

export const removeById = mutation({
  args: { id: v.id('documents') },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('You must be logged in to delete a document');
    }
    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('Document not found');
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError('You are not authorized to delete this document');
    }

    return await ctx.db.delete(args.id);
  },
});

export const updateById = mutation({
  args: { id: v.id('documents'), title: v.string() },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('You must be logged in to delete a document');
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('Document not found');
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );
    if (!isOwner && !isOrganizationMember) {
      throw new ConvexError('You are not authorized to update this document');
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const getById = query({
  args: { id: v.id('documents') },
  async handler(ctx, { id }) {
    const document = await ctx.db.get(id);
    if (!document) {
      throw new ConvexError('Document not found');
    }
    return document;
  },
});
