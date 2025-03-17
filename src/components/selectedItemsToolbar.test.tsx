import { SelectedItemsToolbar } from "./selectedItemsToolbar";
import { usePixaTable } from "../hooks";
import {
  generateMockData,
  RenderHookUsePixaTable,
} from "../mocks/handlers/mockData";

describe("SelectedItemsToolbar", () => {
  let hook: RenderHookUsePixaTable;
  beforeEach(() => {
    hook = renderHook(() =>
      usePixaTable({
        data: generateMockData(25),
        columns: mockDataColumnDefs,
        enableSelectionActions: true,
        selectionActions: [
          {
            name: "Delete",
            onAction: fn(),
            isHidden: false,
          },
          {
            name: "Edit",
            onAction: fn(),
            isHidden: fn().mockReturnValue(false),
          },
          {
            name: "Hidden",
            onAction: fn(),
            isHidden: fn().mockReturnValue(true),
          },
        ],
        initialState: {
          rowSelection: {
            "1": true,
            "2": true,
          },
        },
      }),
    );
  });

  it("renders correctly without any row selection", ({ expect }) => {
    const hook = renderHook(() =>
      usePixaTable({
        data: [],
        columns: mockDataColumnDefs,
      }),
    );
    render(<SelectedItemsToolbar table={hook.result.current} />);
    expect(sc.getByRole("status")).toHaveTextContent("0 Item Selected");
  });

  it("renders the number of selected items", ({ expect }) => {
    render(<SelectedItemsToolbar table={hook.result.current} />);
    expect(sc.getByRole("status")).toHaveTextContent("2 Items Selected");
  });

  it("renders action buttons", ({ expect }) => {
    render(<SelectedItemsToolbar table={hook.result.current} />);
    expect(sc.getByText("Delete")).toBeVisible();
    expect(sc.getByText("Edit")).toBeVisible();
    expect(sc.queryByText("Hidden")).not.toBeVisible();
  });

  it("calls the correct action on button click", ({ expect }) => {
    render(<SelectedItemsToolbar table={hook.result.current} />);
    const deleteButton = sc.getByText("Delete");
    fireEvent.click(deleteButton);
    const actions = hook.result.current.getSelectionActions();
    expect(actions[0].onAction).toHaveBeenCalledExactlyOnceWith(
      hook.result.current.getSelectedRowModel().rows,
      hook.result.current,
    );
  });

  it("calls the correct isHidden function", ({ expect }) => {
    render(<SelectedItemsToolbar table={hook.result.current} />);
    const hidenButton = sc.getByText("Hidden");
    const isHidden = hook.result.current.getSelectionActions()[2].isHidden;
    expect(hidenButton).not.toBeVisible();
    expect(isHidden).toHaveBeenCalledExactlyOnceWith(
      hook.result.current.getSelectedRowModel().rows,
    );
  });
});
