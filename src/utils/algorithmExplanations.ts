// Algorithm explanations for display in the CodeDisplay component

export const getAlgorithmExplanation = (selectedAlgorithm: string): string => {
  switch (selectedAlgorithm) {
    case 'bubble':
      return `Bubble Sort is one of the simplest sorting algorithms to understand and implement. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.

How it works:
1. Compare the first two elements
2. If the first is greater than the second, swap them
3. Move to the next pair and repeat
4. Continue until the end of the array
5. Repeat the entire process until no swaps are needed

The algorithm gets its name because smaller elements "bubble" to the beginning of the list, just like air bubbles rising to the surface of water.

Time Complexity: O(n²) in worst and average cases
Space Complexity: O(1) - sorts in place
Best Case: O(n) when array is already sorted

Pros:
- Simple to understand and implement
- Stable sorting algorithm
- In-place sorting (requires only O(1) memory)
- Can detect if the list is already sorted

Cons:
- Inefficient for large datasets
- More comparisons and writes compared to other O(n²) algorithms`;

    case 'selection':
      return `Selection Sort works by finding the minimum element in the unsorted portion of the array and placing it at the beginning. This process continues until the entire array is sorted.

How it works:
1. Find the smallest element in the array
2. Swap it with the first element
3. Find the smallest element in the remaining unsorted array
4. Swap it with the second element
5. Continue until all elements are sorted

The algorithm divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list.

Time Complexity: O(n²) in all cases
Space Complexity: O(1) - sorts in place

Pros:
- Simple implementation
- In-place sorting algorithm
- Performs well on small lists
- Minimizes the number of swaps (O(n) swaps in worst case)

Cons:
- Inefficient for large datasets
- Does not adapt to data (always O(n²))
- Not stable (relative order of equal elements may change)`;

    case 'insertion':
      return `Insertion Sort builds the final sorted array one element at a time. It's similar to how you might sort playing cards in your hands - you pick up cards one by one and insert each into its proper position.

How it works:
1. Start with the second element (assume first is sorted)
2. Compare it with elements in the sorted portion
3. Shift larger elements to the right
4. Insert the current element in its correct position
5. Repeat for all remaining elements

The algorithm maintains a sorted subarray at the beginning and repeatedly inserts the next element from the unsorted portion into its correct position in the sorted portion.

Time Complexity: 
- Best case: O(n) when array is already sorted
- Average/Worst case: O(n²)
Space Complexity: O(1) - sorts in place

Pros:
- Simple implementation
- Efficient for small datasets
- Adaptive (performs better on nearly sorted arrays)
- Stable sorting algorithm
- In-place sorting
- Online algorithm (can sort a list as it receives it)

Cons:
- Inefficient for large datasets due to O(n²) complexity
- More writes compared to selection sort`;

    case 'merge':
      return `Merge Sort is a divide-and-conquer algorithm that splits the array into smaller subarrays, sorts them independently, and then merges them back together in sorted order.

How it works:
1. Divide the unsorted array into two halves
2. Recursively sort both halves
3. Merge the two sorted halves back together
4. Continue until you have a single sorted array

The key insight is that merging two sorted arrays is much easier than sorting an unsorted array from scratch. The algorithm keeps dividing until it reaches arrays of size 1 (which are inherently sorted), then builds back up.

Time Complexity: O(n log n) in all cases
Space Complexity: O(n) - requires additional memory for merging

Pros:
- Guaranteed O(n log n) performance
- Stable sorting algorithm
- Predictable performance (worst case = average case)
- Works well for large datasets
- Can be implemented iteratively or recursively

Cons:
- Requires O(n) extra memory
- More complex to implement than simple sorts
- Overhead for small arrays
- Not in-place (requires additional memory)`;

    case 'quick':
      return `Quick Sort is a highly efficient divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it, placing smaller elements before the pivot and larger elements after it.

How it works:
1. Choose a pivot element from the array
2. Partition the array so elements smaller than pivot go left, larger go right
3. Recursively apply the same process to the left and right subarrays
4. Continue until subarrays have 1 or 0 elements

The efficiency comes from the partitioning step, which puts the pivot in its final sorted position and ensures we never need to compare elements from different sides of the pivot again.

Time Complexity:
- Best/Average case: O(n log n)
- Worst case: O(n²) when pivot is always the smallest/largest
Space Complexity: O(log n) for recursion stack

Pros:
- Very fast in practice (often faster than other O(n log n) algorithms)
- In-place sorting (requires only O(log n) extra memory)
- Cache-efficient due to good locality of reference
- Widely used and well-optimized in practice

Cons:
- Worst-case O(n²) performance
- Not stable (relative order of equal elements may change)
- Performance depends heavily on pivot selection
- Can be vulnerable to adversarial inputs`;

    default:
      return 'Select an algorithm to view its explanation';
  }
}; 