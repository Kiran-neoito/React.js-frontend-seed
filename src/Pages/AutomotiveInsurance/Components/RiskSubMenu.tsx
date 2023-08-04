interface Props {
  items: Array<{
    text: string;
    id: string;
  }>;
  geoData: string[];
  AddGeoData: (data: string) => void;
  removeGeoData: (data: string) => void;
}

const RiskSubMenu: React.FC<Props> = ({
  items,
  AddGeoData,
  removeGeoData,
  geoData,
}) => {
  return (
    <div className="flex gap-12 py-3">
      {items.map((item) => (
        <div className="flex gap-1 items-center" key={item.id}>
          <input
            type="checkbox"
            className="accent-primary-gray w-[17px] h-[17px]"
            id={item.id}
            checked={geoData?.includes(item?.text)}
            onChange={(e) => {
              if (e.target.checked) {
                AddGeoData(item.text);
              } else {
                removeGeoData(item.text);
              }
            }}
          />
          <label htmlFor={item.id} className="font-medium text-primary-gray">
            {item.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RiskSubMenu;
