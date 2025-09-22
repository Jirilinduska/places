import { FormState } from "@/hooks/useAddNewPost"
import { INewPlaceData, IPost, ISearchResultAPI } from "@/interfaces/interfaces"
import { Box, TextField } from "@mui/material"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"


const ResultItem = ({ name, handleCoords } : { name: string, handleCoords: () => void }) => {
    return <Box onClick={handleCoords} border="1px solid black" p={1} sx={{ cursor: "pointer" }} fontSize="14px">{name}</Box>
}

type Props = {
    value: string, 
    setNewPlace: React.Dispatch<React.SetStateAction<INewPlaceData>> 
    state: FormState
    setState: React.Dispatch<React.SetStateAction<FormState>> 
}

export const SearchInput = ({ value, setNewPlace, state, setState } : Props) => {

    const [searchResults, setSearchResults] = useState<ISearchResultAPI[]>([])

    const handleCoords = (lat: string, lon: string, name: string, countryCode: string, municipality: string, county: string) => {
        setNewPlace((prev) => (
            {   ...prev, 
                lat: Number(lat),
                lon: Number(lon),
                placeName: name,
                country_code: countryCode,
                municipality,
                county
        }))
        setSearchResults([])
    }

    const fetchPlaces = async (search: string) => {
        if (!search) return;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(search)}`,
            {
              headers: {
                "User-Agent": "places-been-app/1.0 (your@email.com)", // TODO 
              },
            }
          );
          const data = await res.json()
          console.log(data)
          setSearchResults(data)
        } catch (err) {
          console.error(err)
        }
    }

    const debouncedFetch = useCallback(debounce(fetchPlaces, 500), [])

  return (
    <Box>
      <TextField
        size="small"
        label="Place name"
        error={state.error === "placeName"}
        helperText={state.error === "placeName" ? "Please enter place name" : ""}
        fullWidth
        value={value}
        onChange={(e) => {
            setNewPlace((prev) => ({...prev,placeName: e.target.value}))
            debouncedFetch(value)
            if(state.error === "placeName") setState(prev => ({ ...prev, error: "" }))
        }}
      />
        <ul>
            {searchResults.map((x, i) => 
                <ResultItem 
                    key={i} 
                    name={x.display_name} 
                    handleCoords={() => handleCoords(x.lat, x.lon, x.name, x.address.country_code, x.address.municipality, x.address.county)}
                />
            )}
        </ul>
    </Box>
  );
};
