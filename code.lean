theorem cannot_be_proved_by_tauto (P Q : Prop) : (P → Q) → P → (P ∧ Q) :=
begin
intro h1,
intro h2,
split,
end
