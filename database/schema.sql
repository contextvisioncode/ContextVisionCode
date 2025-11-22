-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  git_url text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  context_path text, -- Path to the XML file in Supabase Storage
  graph_json jsonb, -- The generated graph data
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Profiles Table (for Stripe/Plan management)
create table public.user_profiles (
  id uuid references auth.users(id) primary key,
  plan text default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for Projects
alter table public.projects enable row level security;

create policy "Users can view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- RLS Policies for User Profiles
alter table public.user_profiles enable row level security;

create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Function to handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, plan)
  values (new.id, 'free');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage Bucket Policy (Assuming bucket 'context-files' exists)
-- You need to create the bucket 'context-files' in the Supabase Dashboard manually or via API if not exists.
-- Policy to allow authenticated users to upload/read their own files.
-- Note: Storage policies are often set in the Storage UI, but here is the SQL equivalent if supported.
-- (This part might need adjustment depending on exact Supabase Storage setup, but serves as documentation)
-- create policy "Authenticated users can upload context files"
-- on storage.objects for insert
-- with check ( bucket_id = 'context-files' and auth.role() = 'authenticated' );
