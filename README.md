# Editorial Fabric

This is the monorepo for _The Student_'s new public website. The idea is simple: build a digital experience that is an active role in storytelling _itself_, rather than simply a vessel for regurgitating text documents.

There are a number of projects that live in this repo. They are:

- `/design` is the central location for all the information about how _The Student_ should look. There are two main levels:
  - Properties, which are the individual pieces of information (like what the exact value of a colour is)
  - Styles, which are collections of properties. For instance, the headline style will have properties about the font size, line height, and colour.
- `/components` hosts all the little bits of UI that can be tied together to make pages in our sites. As they're kept in a separate package, they can be reused across platforms.
