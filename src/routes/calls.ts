export async function fetchMeetings() {
	const response = await fetch('http://127.0.0.1:8984/cbc/meetings');
	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error('fetchMeeting could not fetch data');
	}
}

