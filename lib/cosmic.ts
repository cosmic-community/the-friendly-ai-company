import { createBucketClient } from '@cosmicjs/sdk';
import type {
  Product,
  ProductCategory,
  ProductContent,
  Review,
  BlogPost,
  Page,
  Homepage,
} from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Helper to safely check error status
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Helper to safely extract metafield values
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

// Homepage
export async function getHomepage(): Promise<Homepage | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'homepage' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(2);
    const homepageObj = response.objects[0];
    if (!homepageObj) return null;
    return homepageObj as unknown as Homepage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching homepage:', error);
    return null;
  }
}

// Products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'content'])
      .depth(1);
    return (response.objects as unknown as Product[]).sort((a, b) => {
      const sortA = a.metadata?.sort_order ?? 999;
      const sortB = b.metadata?.sort_order ?? 999;
      return sortA - sortB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content'])
      .depth(1);
    return response.object as unknown as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching product:', error);
    return null;
  }
}

// Product Categories
export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'product-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    return (response.objects as unknown as ProductCategory[]).sort((a, b) => {
      const sortA = a.metadata?.sort_order ?? 999;
      const sortB = b.metadata?.sort_order ?? 999;
      return sortA - sortB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Product Content Modules (Members Area)
export async function getProductContent(productSlug: string): Promise<ProductContent[]> {
  try {
    // First resolve the product to get its id
    const product = await getProductBySlug(productSlug);
    if (!product) return [];

    const response = await cosmic.objects
      .find({ type: 'product-content', 'metadata.product': product.id })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return (response.objects as unknown as ProductContent[]).sort((a, b) => {
      const numA = a.metadata?.module_number ?? 999;
      const numB = b.metadata?.module_number ?? 999;
      return (numA as number) - (numB as number);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching product content:', error);
    return [];
  }
}

export async function getProductContentBySlug(slug: string): Promise<ProductContent | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'product-content', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as unknown as ProductContent;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching product content module:', error);
    return null;
  }
}

// Reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as unknown as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.product': productId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as unknown as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching product reviews:', error);
    return [];
  }
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(0);
    return (response.objects as unknown as BlogPost[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
      .depth(0);
    return response.object as unknown as BlogPost;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Pages
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content'])
      .depth(0);
    return response.object as unknown as Page;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching page:', error);
    return null;
  }
}

// Featured Products (for homepage)
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.featured': true })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return (response.objects as unknown as Product[]).sort((a, b) => {
      const sortA = a.metadata?.sort_order ?? 999;
      const sortB = b.metadata?.sort_order ?? 999;
      return sortA - sortB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured products:', error);
    return [];
  }
}
