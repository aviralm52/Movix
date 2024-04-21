# Movies API
- TMDB api is used to fetch movies and series data


## Problem:
- While calling fetchInitialPage() function in explore.jsx file, if we are passing filter using a variable then in fetchNextPage() filters are passing as null
- And if we are passing filters using state, then it is working fine for fetchNextPage() but showing null in fetchInitialPage()
- So, I have to use both filter variable for initialPage, and fill state for nextPage.


The Problem is solved now! 😎
- The main problem was that when we were selecting either genre or sort then it war working fine but when selecting both the later selected one is only applied
- The problem was due to declaration of filter{} object inside explore function, which was resetting when selecting another input and the later selected input only remains in that, but declaring it outside the function(globally) solved the problem.




