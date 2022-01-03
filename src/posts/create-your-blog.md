---
title: Create Your Blog with SvelteKit
date: 2021-04-03
excerpt: It's time to rewrite your blog in SvelteKit!
---

Recently, SvelteKit is [released in public beta](https://svelte.dev/blog/sveltekit-beta). And we could finally see what Rich Harris called "[Futuristic Web Development](https://www.youtube.com/watch?v=qSfdtmcZ4d0)" looks like. It's always better to learn with project, so I made a little blog (the one you are reading) with SvelteKit and deployed it on the Github Pages. And this series of posts are the things I learnt.

## Brief Intro of Svelte and SvelteKit

For those who are not familiar with Svelte and SvelteKit:

[Svelte](https://svelte.dev/) is a reactive Web component framework. Unlike traditionaly counterparts like React and Vue, Svelte does not use virtual dom (vdom). Instead, Svelte compiles the app to vanilla js during building. This results in an extreme small bundle size and blazing fast speed, as the app no longer contains runtime code and has get rid of the overheads of vdom relevant computation. In addition, Svelte is designed to be very close to plain HTML and CSS, which makes the code clean and easy to read.

[SvelteKit](https://kit.svelte.dev/) is the framework for building Svelte based app. With the help of [Vite](https://vitejs.dev/), SvelteKit provides excellent developing experience.

## Minimal SvelteKit Tutorial

I'm not going to introduce how to use Svelte in this series of posts, as the official doc has done a great job. As for SvelteKit, I will try to cover only the bits and bobs used for the blog app. Anyway, it's very recommended to go through the [Svelte tutorial](https://svelte.dev/tutorial/basics) and the [SvelteKit doc](https://kit.svelte.dev/docs).
