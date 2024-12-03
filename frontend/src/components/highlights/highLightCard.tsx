const HighlightCard = ({ highlightInfo }) => {
  const { imageUrl, text, title } = highlightInfo;

  return (
    <div className="w-96 relative">
      <div className="border rounded-2xl p-4">
        <p className="absolute top-0 m-2 text-gray-400">12 December 2024</p>
        <button className="bg-red-200 text-white rounded-full p-2 w-5 h-5 flex items-center justify-center text-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 absolute top-2 right-2">
          x
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center mt-8">
            <button className="overflow-hidden h-36 w-full">
              <img
                className="object-cover object-center w-full h-full rounded-2xl"
                src={
                  imageUrl ||
                  "https://img.freepik.com/free-psd/holiday-template-design_23-2150299133.jpg"
                }
                alt=""
                onError={(e) => {
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src =
                    "https://img.freepik.com/free-psd/holiday-template-design_23-2150299133.jpg";
                }}
              />
            </button>
          </div>

          <details className="collapse bg-gray-100">
            <summary className="collapse-title text-md text-gray-600 font-medium">
              {title}
            </summary>
            <div className="collapse-content">
              <p className="text-center h-20 pt-1 text-gray-600">{text}</p>
            </div>
          </details>

          <div className="hover:bg-slate-200 p-4 bg-gray-100 rounded-xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EADwQAAIBAwMBBgQDBgUEAwAAAAECAwAEEQUSITEGEyJBUWEycYGxFJGhI0JSweHwFUOC0fEkJWKSBxYz/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIBEAAgMAAgIDAQAAAAAAAAAAAAECAxESITFBBCIyUf/aAAwDAQACEQMRAD8AkpV3FIVqM7iugV0CnYwpJ4x1zQA2u4pIVcZRlYf+JzT8UBgzFdxTsUsCgeDcVwinnHWgeuavPbTizsojvA3SSAZ2j5etJtLyCi30gziuMKAR6vctGJg8m0HB3oMZ9+KM2N0t5b94owQcMPT5e1JSTG4NIeRXKea5tqiRlKn4rhFADDUTVK1RNQIjpUqVAF3FIU7FcxQMhv7tbGzed+SPhHqaw8mtz3l0WvSQmcKpHhArVdo42ltY1zhdx+1AbeyN9OLS3t0aNW/aMTgg5+1Yzl6Nq4aX7eRomSe3IV8ZDeTfOtFZTi5tUmA2k8Mv8JrPvpj2RJu9QTg7Y4beIvn+tT6ZcT2l3HHOuIZTsJ9DjgmohPJYaWVfXQ+eATnAHWo7a4hupTFBIHkHOzoTVsTQxRbHjLMxzz0pojt7eMX0ckSSfGSSPAT5fLFOdzTxCrp5LWMAww46daCafcwG5nlkKLjG4v08/wDei0V6l1cvsxgjcMdKy+mzQwz39vqEQLRyEjjyz1osfKKZVC4zaYR1q3tGkjktbi3hMg4GcBqqdn7kR6hLbsu3cSCAcgkdCKmW9t2aISWzlPhRiBg4J+HHXr50B/xMf/Z5JYPhTbgY5zk8/lUQ/Wml6WG6I5rlOBVlDIdynnNKus4MGgVxqfUb0ARuahNSNUZoENxSrlKgC/XetICnUDKWrR77I+zUB0qSFbqW3vNwEnOVOMgDpWi1SSGLTpnuWCxAdff0FZMRRX93br3sigyAd7FjK+4HrWFi1nRVPEaFZ7eAGHTYo+7Qg5OOPUkY5zWf1zVJE1I98cyGFcKnQsSSM/KiUr3FhC4vIBfxxOyLLBIUJwf3l9DQvThHqd/qD38CK9yAIWCkGIr0ArNR7N7JribScrcaRBc84Vwsu3qAyjH6/eqwtra2gkWPfcAjLtjPuAaj0S7jkuLjS7niGZFUP6EdD+gqS7Fvpd0Y7ud7d1G0ShTg/l0NZt6y6lixkmmLaFp1tYthjhDZznPjwefPqayHa29j03XYruzlBnyN8fX2IrWaDMl3FeXkOSm028CE4LquCx/M/pXnutO/aC9tnhZjcpH+2lIOwNn4V9l5Fb1rY4c10snqDV12lt5bV49NiuWvZhtCMuBHnrzWVuLa9TU5LCJTLdDl9g5Jxkj9RW00B7Vot80cMd3bgmZFwT5gkc8dDxU3ZHSC+qrq4fLXvjbJ+EOpbH5/aqrXbC1tpMh7N6KDDBf3NzdNcuQu0uV7on5dRRW31B11670mYiRocbH6N8IJz69aOx2LtcJ3cY278Sqf4PiB9scmvK9e1V4O2VzdQbd8Vx0XGPD4T9sVqjnfR6U1Quack6XFvHPE2Y5VDoR6EZqJmpkjGNRmusc1zFADaVI0qACGeKmtYHurmKBPikYKOPWoaJ9nATrlkBjPeH7GgYI7ddh74SG4tr0XNuVzlxt7ojquBxzkc9aWgdnLFezlteSwPHL3kveSCQ+AA8Z5x5Hyr0PWWtNR0+4s7p0iLR7GU8OpHRh6j+teXzvrR7GnQm0qVIEZ2lu43yjDOfLkD1rMyewk5eiWyuFvYbhbi1NvOJnOzjd1zgjPUAiumFJZgoQALknj161atuz8MOnadq2sSdzezW6pawWy7Aq+RcD4mOTn+lSaSga8VJBkOMMfespwZ2fHslKC5DbyyWERlAA21WH1qtrUxaJY5lR/DhWb+Hrj70X1LwT2cTkbiuMewNC9VhULZd4RtcFWz5gDyHzrLjskdCYL7Ms9i0VvLHscgyAeuRkj54xTbzuopzHH3Wwqnd7R4gBwBn60P1S9mhugC4aZcKjEdAOQfegd1NcTu8hkfefEFBwT71ovqzKa0m1TUILKa7tIrNTczORNdhmLkFANmOnhIBz8xVPTO0Gs6aUW0vnEKMpETKGXA6cEUyOW6SEBUDq2CATnbmodXEDxRTxh4gG2MoHPzx7VtGa3DGUHm6b+97fhuy80a2k0Gr3mEgKpmKRT4SyH15PB9R1ryeQNHcPHMu1kYqynyIPNen9joNOlsEjt7n8ZBDKJM3CgGJz6/wAOT7n61592njhh1+9ighkhVJmBEhySc9fl6e2K08My9Gw7B6x+Is306VvHb+KLPmh6j6H71pz1ryHSr5tNv4LxHBMbcqv7w8x+VeswypPEk0TBo5FDIR5g9KAHmmMacelN6mgBDpSpwFKgC9V3RGMerWj7wmJPiPQcVRFEuz2f8USTYriJWY7/AIRxgE/nQBttTBeFWWMuhGQ+wHb/AKuMCvME1eeye4AcyKZZE2Z8AG4jg4HOPat3JqaaflImLXUi4EsxZUHuAAR9qxVo/eaTa2MFkfxUkzTPcbRvJ3EYPXy/vzqUVjS0rarqdzqWoxy3EbBUULGhB8IHSrEdwtmokYjKkEn65p95E0HcW7NEMkswGWY9OSx6/wAuKo34kO0KsjKzqrMUG0Lnn3ptab1LEFNVuEm1VJFBKRodhB9T/Wu6jfIe7t1Q7oYxub3P/P6UOUQCY4OMIoBLdW/vFcVgtqZruQB2AUerEEdPoTWElxaOiEdMj2gRf8QYGYRYjLe5+VDrSKSdzsSSRQCfhw7Z4ot2wjthqcbbHxsxIFOSxHuen9KZo94F1W2VGfBjI3MMH1GamT9iS+2MvR6VBPp6uLOSKdI0UgyMAx4zwenNZrVrGa2S4iu12up3eA5LeeTXo0/fzxSvKXBx4WiIGPtXnvaW7VdRu4nmL7ERDkck7RnkfOlBvR3JKJnYtQmi0+5sI2HcXMiPIPMlc4+9VpJHmk3SyM7nALMcn0qaKzleIyiKQxgZLAGmSR7Tt2lfryRXTp52MaPDxnpXofYa877R+4Zsm3bH+k8j+dYi9tDHdCCHc4cLs4znNaTsZBLYajPFchkeSPGw+RU/81RHJJ4bUmuDrXc8V1RTKHUqVcoAtCp7W6NrIWBxkY+vlVekVDgqyhlPUHzpDINU1tpGH4u3kuxGu4rEucemarG7hs4o7i4hjmnJIkLyFcHqRjoccD61Q1fSpMt+EuHhZhvjZWO4MvOPfI4qxoNpDcI8V/fCSeSFFVnQMFHXjBHvnNYqLUtOqM4yhxYyTtEdSuVmZI4Y4wYx3YAA4zzjzJx86IWdwLq1WRW5Xdv+nn8qHGxWMS2iMrwLI3iCbe8IPX29KsL3bP8As2cYPdqNu1TwTkevStsKXSFqt1HHDLEgyxGFKDITzyaHXmv20l0O+kWSdFEcMY559avyKsskpXw4OOPLGaz1poUNoby8WVRsL7VPG0VE697NW3GKaKfaK7MluhbLZcKWAyfMmpOz+lXcV1FeyjaNx3K658HmPnirsNnHNLas4DLH48HoT0GfvWkt1ym9v19Klx1HFZc4z6BXaPUb3R7J7jTL0NbnCiORQxUk8DPX86yGmWUuordyzd7LcSIzhFXLSOT/AFNa7tBZJeWM2FYMoDFlHoeKz9i1tpBt5tRlu4Sw3IViyHToR+f/ABUKPFYdELFZ9mTXt7b2+mvb3EyRyLEV7jJ3lsYA6cfWsfcS97IDsEYAx160T7Qa1Hq8i7IHBjkfu3ZsnuzyFPyOfpQuS3lhIE0Tx7lDAOMEqeh+Rq64/wBOeyXfXguSs0llbXGeY2MTHnjzX71pLe/eS70+9dt/SNmwBnIwc469evWgGlRC5sby2Ps6fP8AsCtdp2h/9niha8dZZYxIVAGM4GOPanKaj5MHRO1pw9GhiOam8qpWhIAVzlgOSOhNXPIVqnpXjpipVwtSpgWQeK7mmV2pGXILJbqzdv8ANjlDJ9KyVzp89lflkUx4Yso9s9K22jsBG4Pk4P6UO7d6hFYWJ7qPfdNgx8+Z4H65/KoZpBa8AMhIK26kFhzM3oP4R/P+tWe9DNbFlbcJ8N6fCcH9aHWcbQRKj7mdwGdz5k8k1Yu7hVfC9d8ZHy5rT0egq1g6KQq9zyP/AND+VZzUbyS5upreOTFs7gtj94irmoySySyW1vnc4DO3kg9/nWeMc+7IymBnBxSb0y+RLEoh/Sp1lvO6DeFMcD5GtCzPIiwx/vck+i/1rMdmLFkY3cjbjLk4HTA4H65rRT3SQDZ3oM58/JfoKlnmWfo7FOv4u5hXLY2hhu4Ixnb8+c0K7U6S03Z24MKFu4cSqwyQVPX+ZPyq/ZSxIIHukjR52BBQ7Xz5ZGOTgDNFXme5LxzEw2wXayNgbhjFYS6kd9CThhiv/j/S4pLO8vLmPKOwhywGNmNz/nwv1pdubSW5laYJGPwcQe6kJA8chGIx6kDAx6CtFpL2dpL+C0yUNaWudwzklieSaxXbDXUvrp7PTwEsYpGbj/NkPVyfP29qqOuQTUY14VezXhupl8mj/nWyivQi2UjHL26OjKOrL5fXnFYrs43/AHAe6GtWE65+lazimc9Vjg9C9tJ3js4UoCc7T5cVfz4RQewbiiqHKiqis6Ik9enaVdzilVCLFdFMFSDipGWbOZYN7OcKMMx9AM1k5dRi1zVGmRxIituJXkKMYAz8sVp7cAy4ZQykEEHoRishNp02gySxrths97MsojyWHkM5wPIcjyow6PjtKXY5rqWC9WLumlSQs2F6pj7jkcVBdXccqpciRO6Zl8ZOBgZobYSPGJ7q9uTLIyEJxwmV3Y44HWr9jolvd20AkaRNvDKh4bafMUds6nY0two61q9q0iNa3rbwMN3XQ/PjFVpBLMyx3pwwHCr+/np0rQx9ndOs/wBqsRZh03HIqvpMS3PaBpSu7YTt9jjrQkc1jlLyWLm6FhYwLCPEzNADt6AHnj++tEtPtAke8nMrEEyEAnFBNS/avag5AEsucepfB+1aO3IAkwcIAFFNnHb+gNdbzqE7TOJe5G2NAmNgIB+pPrQozazqluIluHt8klQy7SUHBY+nOB+dEZ5Nup3jOcK7Lj34FWdMEbNM2S0srkNnyHl9OtQ4pkRtlFNIw9vc3FtZ3FtBcusk7bSFPx+uT1oZKoLZUBc9VHlRO5hSTVb6CCQErKzREeZzzj1qG7hjCJIispHEo6qD6g/yppI1cn0S9nuL9Pka2qx9CaydlYS6fe2kkxHdXEPexOOjAjP0xxWxtcSxIykEEdQapgMhO2XAopAcjmqncgNkKasw8CmBOTSqInmu0CLyipFFNXApM4Ue9LCieEgTLnrz9qFdrl77ThasrFJnG7bwMDkfrirttIWulB9D9qHdtd6aeksJIuN4WME8ep48+B+tP0XXnNaZmCyR4oYAu2EvhlHG4CjWlMD3qDjErYoHDrVtabFvA8Ey87du4HPmDV7s9dJcPLJGxZJJjgkY8hUpnbOUWumEdRmxkZIVELv8vKqukxGC4Csqhki3Pj+J2Gf04p8P/V3Erk+AzBRnzCj+zU9iVe7uJD8LsCT7Dn+Q/OrS9nPJgTVXZYVcfD+ImB+e/P8AvRS0uO+SM5xu96D3ImutGR4OW3SXLKPQv/WqkN0yKhL+ED16Un2clvbJO1cj9/bvBIwRiynHmaD/AIq8tEaS1uZYiwweev51c1SdDHE24F4nB2+xzRObTobmxWaMhfDzxSaI8GSsLa4ncvbEiROhA6mrbrKcWrWs6OTlowfAT61oezdi1kXZ1ZWkJAbrj0NHSIO8JjAz+8QOR9KSQOZl+9uZ47eK5IkWCIRIAuNoHkOPQDPrirFrf3OnR7Y0V1PKiUdPyohfom/fjGfTiqbQd7bcZ29c+Zq0TyDGn6qt+mGCxygeKL29R7VeVwwJXHHXHlWLdvwMkcyAgoTuA/h/eH5VqLSdWMTo26OePIIpYUpPS4TzSppPNKmahKQ4U4qOXiJ381HFKlSAE6dqc8lxI5CDY20ADyxTe0F9NdrarKFAG4+EY9KVKg6qUtTMg1nE+pgShpAzAYds458q0gxBHJ3ShdgYqAOmFpUqgppFuyUR2r7f3YMj5nOT+lNtSQl6RxtXA/8AWlSrdeDGQF0+V447cKcf9Cv6lv8AagVyzKwUMdoXdj3pUqhGNn6IbkkWu7OWkfxE9eK13Z39tYHvOQCMD/SKVKlIxkG40VUGFHUUNvTicqvhAfAx5cZpUqSJKV0xdFJPU4Ix1q5YgNEGwAScHFKlVEsoX8Kfg5W5ztz1qDs9PI0XdlsrHIu32znP2rlKga8GppUqVB0n/9k="
                className="w-16 h-16 rounded-md"
              />
            </div>

            <div className="flex-grow min-w-0">
              <h3 className="font-semibold capitalize truncate overflow-hidden">
                Name
              </h3>
              <p className="text-sm text-gray-500 truncate overflow-hidden">
                artist
              </p>
            </div>

            <div className="flex-shrink-0 text-sm text-gray-500 text-right">
              123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
