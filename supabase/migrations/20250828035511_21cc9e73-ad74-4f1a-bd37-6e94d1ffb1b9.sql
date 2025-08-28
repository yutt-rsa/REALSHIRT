-- Create gallery_items table for admin to manage gallery content
CREATE TABLE public.gallery_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  technique text,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view gallery items (for public gallery page)
CREATE POLICY "Anyone can view gallery items" 
ON public.gallery_items 
FOR SELECT 
USING (true);

-- Only admins can manage gallery items
CREATE POLICY "Admins can manage gallery items" 
ON public.gallery_items 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gallery_items_updated_at
BEFORE UPDATE ON public.gallery_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();