CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`priority` text DEFAULT 'normal' NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`userId` integer NOT NULL
);
