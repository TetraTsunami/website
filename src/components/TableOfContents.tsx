"use client"

import { useEffect } from "react"

/*
window.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
      } else {
        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
      }
    });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });
});*/
export default function TableOfContents({ tableOfContents }: { tableOfContents: { indent: number, title: string, slug: string }[] }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('aria-labelledby');
        if (entry.intersectionRatio > 0) {
          document.querySelector(`nav li a[href="#${id}"]`)?.parentElement?.classList.add('active');
        } else {
          document.querySelector(`nav li a[href="#${id}"]`)?.parentElement?.classList.remove('active');
        }
      });
    });
  
    // Track all sections that have an `id` applied
    document.querySelectorAll('section[aria-labelledby]').forEach((section) => {
      observer.observe(section);
    });
  })
  return (
    <nav className="scrollspy top-20 self-baseline rounded-xl bg-bkg/90 p-4 shadow-i-sm transition-colors sm:sticky md:p-6">
      <ul className="flex flex-col gap-2">
        {tableOfContents.map(({ indent, title, slug }) => (
          <li key={slug} style={{"marginLeft": indent + "rem"}}>
            <a href={`#${slug}`}>{title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}