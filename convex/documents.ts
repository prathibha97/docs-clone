import { paginationOptsValidator } from 'convex/server';
import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

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
    return await ctx.db.insert('documents', {
      title: args.title || 'Untitled Document',
      initialContent: args.initialContent,
      ownerId: user.subject,
    });
  },
});

export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query('documents').paginate(args.paginationOpts);
  },
});

export const removeById = mutation({
  args: { id: v.id('documents') },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('You must be logged in to delete a document');
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('Document not found');
    }

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError('You are not the owner of this document');
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

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError('You are not the owner of this document');
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});
