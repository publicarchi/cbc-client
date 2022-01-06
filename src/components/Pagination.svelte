<script lang="ts">
//   import { writable } from 'svelte/store';
//   const pagination = writable(20)

//   function handleSelectChange(event) {
//     let select = document.getElementById('pagination')
//     let option = select.options[select.selectedIndex]

//     console.log(document.getElementById('value').value)
// }

export let params

const paginationOnChange = (e) => {
  console.log(e.target.value)
  params.nb = e.target.value
}

</script>

<select id="pagination" on:change={paginationOnChange}>
  <option value="20" selected>20</option>
  <option value="200">200</option>
  <option value="2000">2000</option>
</select>